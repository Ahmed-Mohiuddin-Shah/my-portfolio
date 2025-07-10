import { NextResponse } from "next/server";

export async function GET() {
  const query = `
    query {
      user(login: "Ahmed-Mohiuddin-Shah") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              languages(first: 1) {
                nodes {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();
  return NextResponse.json(data.data.user.pinnedItems.nodes);
}
