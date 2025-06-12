export type MenuItem = "Dashboard" | "Search Scores" | "Reports" | "Settings"

export interface User {
  id: string
  name: string
  email: string
  registrationNumber: string
}

export interface Score {
  id: string
  subject: string
  score: number
  maxScore: number
  date: string
  grade: string
}

export interface Report {
  id: string
  title: string
  type: string
  generatedDate: string
  status: "completed" | "pending" | "failed"
}
