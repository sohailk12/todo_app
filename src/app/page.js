import SignIn from "./signin/page";

export default function Home() {
  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="p-4 bg-white rounded shadow">
    <h1>Todo-App</h1>
  <SignIn />
  </div>
</div>
  );
}
