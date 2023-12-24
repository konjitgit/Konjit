const SocialIcons = ({ Icons }) => {
  return (
    <div className="social-icons flex">
      {Icons.map((icon) => (
        <span
          key={icon.name}
          className="p-2 text-gray-600 cursor-pointer flex items-center rounded-full  mx-1.5 text-xl hover:text-pink duration-300"
        >
          <ion-icon name={icon.name}></ion-icon>
        </span>
      ))}
    </div>
  );
};
export default SocialIcons;