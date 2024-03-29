export default function HardwareDetailItem({hardware}) {
    return (
        <div id="hardware-container" className="flex flex-col items-center space-y-4">
          <h1 className="font-bold text-3xl text-darkFont">{hardware.name}</h1>
          <div className="w-full rounded-lg bg-white shadow-md grid grid-cols-2 p-4">
            <p className="whitespace-normal break-all">Hardware id</p>
            <p className="whitespace-normal break-all">
              {hardware.id_hardware}
            </p>
            <p className="whitespace-normal break-all">Name</p>
            <p className="whitespace-normal break-all">{hardware.name}</p>
            <p className="whitespace-normal break-all">Type</p>
            <p className="whitespace-normal break-all">{hardware.type}</p>
            <p className="whitespace-normal break-all">Description</p>
            <p className="whitespace-normal break-all">
              {hardware.description}
            </p>
          </div>
        </div>
    );
}