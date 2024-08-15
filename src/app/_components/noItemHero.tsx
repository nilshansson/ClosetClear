export function NoItemsHero() {
  return (
    <div
      className="hero min-h-8 w-full"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1519220279207-fddf068f2141?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content  text-center text-white">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Seems like this closet is empty...
          </h1>
        </div>
      </div>
    </div>
  );
}
