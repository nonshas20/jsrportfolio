"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Github, MapPin, Users, BookOpen } from "lucide-react";
import { WordsReveal, Reveal, CountUp } from "@/components/motion-primitives";

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

type GHData = {
  profile: Profile | null;
  repos: Repo[];
  contributions: { weeks: ContributionWeek[]; total: number } | null;
};

const EASE = [0.22, 1, 0.36, 1] as const;

// map GitHub levels to ember intensity (on-brand instead of green)
const levelClasses = [
  "bg-foreground/8",
  "bg-ember/30",
  "bg-ember/55",
  "bg-ember/80",
  "bg-ember",
];

function timeAgo(iso: string): string {
  const d = new Date(iso);
  const months = Math.floor((Date.now() - +d) / (1000 * 60 * 60 * 24 * 30));
  if (months >= 12) return `${Math.floor(months / 12)}y ago`;
  if (months >= 1) return `${months}mo ago`;
  const days = Math.floor((Date.now() - +d) / (1000 * 60 * 60 * 24));
  if (days >= 1) return `${days}d ago`;
  return "recently";
}

function Heatmap({ weeks, total }: { weeks: ContributionWeek[]; total: number }) {
  if (!weeks.length)
    return (
      <div className="flex h-32 items-center justify-center font-mono text-xs text-muted-foreground">
        Contribution data unavailable
      </div>
    );

  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // show a label only when the month changes AND enough weeks have passed
  const labels: { idx: number; label: string }[] = [];
  let lastMonth = -1;
  let weeksSinceLastLabel = 0;
  weeks.forEach((w, i) => {
    const firstDate = new Date(w.days[0]?.date);
    const m = firstDate.getMonth();
    weeksSinceLastLabel++;
    if (m !== lastMonth && weeksSinceLastLabel >= 4 && w.days[0]) {
      labels.push({ idx: i, label: monthLabels[m] });
      lastMonth = m;
      weeksSinceLastLabel = 0;
    }
  });

  return (
    <div className="mt-6 overflow-x-auto">
      <div className="min-w-[680px]">
        {/* month labels */}
        <div className="relative mb-1 ml-7 h-4">
          {labels.map((l) => (
            <span
              key={l.idx}
              className="absolute font-mono text-[0.55rem] text-muted-foreground"
              style={{ left: `${l.idx * 13}px` }}
            >
              {l.label}
            </span>
          ))}
        </div>
        <div className="flex gap-[3px]">
          {/* day labels */}
          <div className="mr-1 flex flex-col justify-between py-[1px] font-mono text-[0.55rem] text-muted-foreground">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>
          {/* grid */}
          <div className="flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.days.map((day, di) => (
                  <motion.div
                    key={di}
                    initial={{ opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-5% 0px" }}
                    transition={{ duration: 0.25, delay: (wi * 7 + di) * 0.002, ease: EASE }}
                    className={`h-[10px] w-[10px] rounded-[2px] ${levelClasses[day.level]}`}
                    title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* legend */}
        <div className="mt-3 flex items-center justify-end gap-2 font-mono text-[0.6rem] text-muted-foreground">
          <span>Less</span>
          {levelClasses.map((c, i) => (
            <span key={i} className={`h-[10px] w-[10px] rounded-[2px] ${c}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

function RepoCard({ repo, index }: { repo: Repo; index: number }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer noopener"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-xl border border-line bg-card p-5 transition-colors hover:border-ember/50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-ember" strokeWidth={1.6} />
          <span className="font-display text-[1.05rem] font-semibold text-foreground transition-colors group-hover:text-ember">
            {repo.name}
          </span>
        </div>
        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={1.6} />
      </div>

      <p className="mt-2.5 line-clamp-2 flex-1 text-[0.8rem] leading-relaxed text-muted-foreground">
        {repo.description || "No description provided."}
      </p>

      <div className="mt-4 flex items-center gap-4 font-mono text-[0.68rem] text-muted-foreground">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ember" />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3" strokeWidth={1.6} />
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <GitFork className="h-3 w-3" strokeWidth={1.6} />
            {repo.forks_count}
          </span>
        )}
        <span className="ml-auto">{timeAgo(repo.updated_at)}</span>
      </div>

      {repo.topics && repo.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.58rem] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.a>
  );
}

export function GitHub() {
  const [data, setData] = React.useState<GHData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const profile = data?.profile;
  const repos = data?.repos?.slice(0, 6) ?? [];
  const contributions = data?.contributions;

  return (
    <section id="github" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* header */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal className="eyebrow mb-5 flex items-center gap-3 text-muted-foreground">
              <span className="inline-block h-px w-8 bg-ember" />
              GitHub
            </Reveal>
            <h2 className="display max-w-2xl text-balance text-[clamp(2rem,6vw,4.2rem)] text-foreground">
              <WordsReveal text="The code," />{" "}
              <span className="display-italic text-ember">
                <WordsReveal text="out in the open." delay={0.2} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.2} className="max-w-xs">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Live from GitHub — profile, repositories, and contribution
              activity, fetched in real time.
            </p>
          </Reveal>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Fetching from GitHub…
            </div>
          </div>
        ) : profile ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* profile card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="lg:col-span-4"
            >
              <div className="rounded-2xl border border-line bg-card p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={profile.avatar_url}
                    alt={profile.name || profile.login}
                    className="h-16 w-16 rounded-full border-2 border-ember object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg leading-tight text-foreground">
                      {profile.name || profile.login}
                    </h3>
                    <p className="font-mono text-sm text-muted-foreground">
                      @{profile.login}
                    </p>
                  </div>
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted-foreground transition-colors hover:border-ember hover:text-ember"
                    aria-label="View GitHub profile"
                  >
                    <Github className="h-4 w-4" strokeWidth={1.6} />
                  </a>
                </div>

                {profile.bio && (
                  <p className="mt-4 text-[0.85rem] leading-relaxed text-foreground/80">
                    {profile.bio}
                  </p>
                )}

                <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-5">
                  <div>
                    <dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground">
                      Repos
                    </dt>
                    <dd className="mt-1 font-display text-xl text-foreground">
                      <CountUp to={profile.public_repos} />
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground">
                      Followers
                    </dt>
                    <dd className="mt-1 font-display text-xl text-foreground">
                      <CountUp to={profile.followers} />
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground">
                      Following
                    </dt>
                    <dd className="mt-1 font-display text-xl text-foreground">
                      <CountUp to={profile.following} />
                    </dd>
                  </div>
                </dl>

                {profile.location && (
                  <p className="mt-4 flex items-center gap-2 font-mono text-[0.68rem] text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-ember" strokeWidth={1.6} />
                    {profile.location}
                  </p>
                )}
                <p className="mt-2 flex items-center gap-2 font-mono text-[0.68rem] text-muted-foreground">
                  <Users className="h-3.5 w-3.5 text-ember" strokeWidth={1.6} />
                  Joined {new Date(profile.created_at).getFullYear()}
                </p>
              </div>
            </motion.div>

            {/* contribution graph + repos */}
            <div className="lg:col-span-8">
              {/* contributions */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="rounded-2xl border border-line bg-card p-6"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-base text-foreground">
                    <CountUp to={contributions?.total ?? 0} />{" "}
                    <span className="text-muted-foreground">
                      contributions in the last year
                    </span>
                  </h3>
                </div>
                {contributions && (
                  <Heatmap weeks={contributions.weeks} total={contributions.total} />
                )}
              </motion.div>

              {/* repos */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {repos.map((r, i) => (
                  <RepoCard key={r.id} repo={r} index={i} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center font-mono text-xs text-muted-foreground">
            Unable to load GitHub data.
          </div>
        )}
      </div>
    </section>
  );
}
