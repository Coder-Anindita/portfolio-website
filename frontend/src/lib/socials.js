import { Mail } from 'lucide-react'
import { GitHubIcon, LeetCodeIcon, LinkedInIcon } from '../components/ui/BrandIcons.jsx'
import { profile } from '../data/profile.js'

// Derived from profile.js so every social link on the site stays in sync.
export const socials = [
  { label: 'GitHub', href: profile.github, icon: GitHubIcon, handle: profile.github.replace(/^https?:\/\/(www\.)?/, '') },
  { label: 'LinkedIn', href: profile.linkedin, icon: LinkedInIcon, handle: profile.linkedin.replace(/^https?:\/\/(www\.)?/, '') },
  { label: 'LeetCode', href: profile.leetcode, icon: LeetCodeIcon, handle: profile.leetcode.replace(/^https?:\/\/(www\.)?/, '') },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail, handle: profile.email },
]
