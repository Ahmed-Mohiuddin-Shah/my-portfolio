import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(
    'https://api.github.com/users/Ahmed-Mohiuddin-Shah/repos?sort=pushed&direction=desc',
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  const repos = await res.json();
  return NextResponse.json(repos);
}
