function Footer() {
  return (
    <div className="py-8 px-10 border-t">
      <div className="flex flex-row mb-10">
        <div className="flex flex-col gap-8 flex-[2]">
          <h3 className="font-bold text-xl">SFUI Shopping</h3>
          <div>273 Nguyen Van Cu, Distric 5, Ho Chi Minh</div>
        </div>
        <div className="flex flex-col gap-8 flex-1 font-bold">
          <div className="text-gray-400">Links</div>
          <div>Home</div>
          <div>Shop</div>
          <div>About</div>
          <div>Contract</div>
        </div>
        <div className="flex flex-col gap-8 flex-1 font-bold">
          <div className="text-gray-400">Help</div>
          <div>Private Policies</div>
        </div>
      </div>
      <div className="border-t-2 py-4">2024 Vy. All rights reverved</div>
    </div>
  );
}

export default Footer;
