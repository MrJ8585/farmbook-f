type ProductCardType = {
  image: string;
  name: string;
  desc: string;
};

const ProductCard: React.FC<ProductCardType> = ({ image, name, desc }) => {
  return (
    <div className="w-[200px] h-[300px] flex flex-col items-center justify-between p-5 bg-white shadow-md rounded-lg">
      <div className="w-full h-[60%]">
        <div
          className="w-full h-full bg-center bg-cover"
          style={{ backgroundImage: `url('${image}')` }}
        ></div>
      </div>
      <div className="w-full h-[40%] flex flex-col gap-2 py-2">
        <span className="font-bold">{name}</span>
        <span className="font-light">{desc}</span>
      </div>
    </div>
  );
};

export default ProductCard;
