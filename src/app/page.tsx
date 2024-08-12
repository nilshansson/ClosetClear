import { SignedOut, SignedIn } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <h1>you are signed in!</h1>
      </SignedIn>
    </main>
  );
}
