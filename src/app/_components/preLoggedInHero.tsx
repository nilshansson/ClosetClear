export function PreloggedInHero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1600247354058-a55b0f6fb720?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content  text-center text-white">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to ClosetClear</h1>
          <p className="mb-5">
            We help you make smart decisions about your wardrobe. Easily
            identify what to keep and what to let go, bringing order and
            simplicity to your closet. Start your journey today with
            ClosetClear.
          </p>
        </div>
      </div>
    </div>
  );
}
