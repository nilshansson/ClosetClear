export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>ClosetClear</div>

      <div className="flex flex-row items-center gap-4">
        <h1>signin</h1>
        {/* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn> */}
      </div>
    </nav>
  );
}
