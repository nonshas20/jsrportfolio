import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 3600;

type Profile = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  location: string | null;
  blog: string | null;
  company: string | null;
  created_at: string;
};

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  homepage: string | null;
};

type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type ContributionWeek = { days: ContributionDay[] };

// Fallback profile (from the screenshot / known public info)
const FALLBACK_PROFILE: Profile = {
  login: "nonshas20",
  name: "Johnnyyy shanny",
  bio: "a bit of everythinng - vibe coding specialist",
  avatar_url: "https://avatars.githubusercontent.com/u/183965222?v=4",
  html_url: "https://github.com/nonshas20",
  followers: 0,
  following: 0,
  public_repos: 4,
  location: "Parañaque City, Philippines",
  blog: null,
  company: null,
  created_at: "2023-01-01T00:00:00Z",
};

// Fallback pinned repos (from the screenshot)
const FALLBACK_REPOS: Repo[] = [
  {
    id: 1,
    name: "jsrportfolio",
    html_url: "https://github.com/nonshas20/jsrportfolio",
    description: "Personal portfolio — full-stack developer building civic & enterprise systems.",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["nextjs", "react", "tailwindcss", "framer-motion"],
    updated_at: new Date().toISOString(),
    homepage: null,
  },
  {
    id: 2,
    name: "slimeatory",
    html_url: "https://github.com/nonshas20/slimeatory",
    description: "A playful interactive project built with TypeScript.",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["typescript"],
    updated_at: "2025-06-01T00:00:00Z",
    homepage: null,
  },
  {
    id: 3,
    name: "fieldnotes",
    html_url: "https://github.com/nonshas20/fieldnotes",
    description: "Notes app — clean, fast, TypeScript.",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["typescript"],
    updated_at: "2025-05-15T00:00:00Z",
    homepage: null,
  },
  {
    id: 4,
    name: "pubgclone",
    html_url: "https://github.com/nonshas20/pubgclone",
    description: "Game clone experiment in TypeScript.",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["typescript", "game"],
    updated_at: "2025-04-01T00:00:00Z",
    homepage: null,
  },
];

function authHeaders(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "jsr-portfolio",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

async function fetchProfile(): Promise<Profile | null> {
  try {
    const res = await fetch("https://api.github.com/users/nonshas20", {
      headers: authHeaders(),
    });
    if (!res.ok) return null;
    const j = await res.json();
    return {
      login: j.login,
      name: j.name,
      bio: j.bio,
      avatar_url: j.avatar_url,
      html_url: j.html_url,
      followers: j.followers ?? 0,
      following: j.following ?? 0,
      public_repos: j.public_repos ?? 0,
      location: j.location,
      blog: j.blog,
      company: j.company,
      created_at: j.created_at,
    };
  } catch {
    return null;
  }
}

async function fetchRepos(): Promise<Repo[] | null> {
  try {
    const res = await fetch(
      "https://api.github.com/users/nonshas20/repos?per_page=100&sort=updated",
      { headers: authHeaders() }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as Array<Record<string, unknown>>;
    return data
      .filter((r) => !r.fork)
      .sort(
        (a, b) =>
          (Number(b.stargazers_count) || 0) - (Number(a.stargazers_count) || 0) ||
          +new Date(String(b.updated_at)) - +new Date(String(a.updated_at))
      )
      .map((r) => ({
        id: Number(r.id),
        name: String(r.name),
        html_url: String(r.html_url),
        description: (r.description as string) || null,
        language: (r.language as string) || null,
        stargazers_count: Number(r.stargazers_count) || 0,
        forks_count: Number(r.forks_count) || 0,
        topics: (r.topics as string[]) || [],
        updated_at: String(r.updated_at),
        homepage: (r.homepage as string) || null,
      }));
  } catch {
    return null;
  }
}

async function fetchContributions(): Promise<{ weeks: ContributionWeek[]; total: number } | null> {
  try {
    const res = await fetch("https://github.com/users/nonshas20/contributions", {
      headers: { "User-Agent": "jsr-portfolio" },
    });
    if (!res.ok) return null;
    const html = await res.text();

    // extract the total from the heading ("270 contributions in the last year")
    let total = 0;
    const totalMatch = html.match(/(\d+)\s+contributions?\s+in\s+the\s+last\s+year/i);
    if (totalMatch) total = parseInt(totalMatch[1], 10);

    // GitHub now uses <td> elements with data-date and data-level (0-4)
    const tdRegex =
      /<td[^>]*data-date="([^"]+)"[^>]*data-level="(\d)"[^>]*>/g;
    const weeks: ContributionWeek[] = [];
    let currentWeek: ContributionDay[] = [];
    let match: RegExpExecArray | null;
    while ((match = tdRegex.exec(html)) !== null) {
      const date = match[1];
      const level = parseInt(match[2], 10) as 0 | 1 | 2 | 3 | 4;
      // approximate count from level (GitHub doesn't expose exact counts anymore)
      const count = level === 0 ? 0 : level === 1 ? 1 : level === 2 ? 3 : level === 3 ? 6 : 10;
      currentWeek.push({ date, count, level });
      if (currentWeek.length === 7) {
        weeks.push({ days: currentWeek });
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) weeks.push({ days: currentWeek });
    return { weeks, total };
  } catch {
    return null;
  }
}

export async function GET() {
  const [liveProfile, liveRepos, contributions] = await Promise.all([
    fetchProfile(),
    fetchRepos(),
    fetchContributions(),
  ]);

  // Use live data when available, fall back to known profile/repos
  const profile = liveProfile ?? FALLBACK_PROFILE;
  const repos = liveRepos ?? FALLBACK_REPOS;

  return NextResponse.json({
    profile,
    repos,
    contributions: contributions ?? { weeks: [], total: 0 },
    fetchedAt: Date.now(),
  });
}
