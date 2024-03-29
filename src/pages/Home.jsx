export default function Home() {
  return (
    <div className="bg-pageBackground min-h-screen max-h-full flex">
      <div className="bg-white rounded-lg py-24 w-3/4 h-2/3 m-auto flex flex-col items-center justify-around shadow-md">
        <h1 className="font-bold text-secondary text-[40px] text-center">Welcome to IoT Dashboard</h1>
        <img src="/iot-dashboard-home.png" className="w-2/3"></img>
      </div>
    </div>
  );
}
