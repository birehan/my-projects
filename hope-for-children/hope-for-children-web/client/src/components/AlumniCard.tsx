interface Props {
  name: string;
  story: string;
  photoUrl: string;
}

const AlumniCard = ({ name, story, photoUrl }: Props) => {
  return (
    <div className="studentList py-5 px-10 m-auto  flex flex-col md:flex-row  gap-6 items-center justify-center w-full rounded-xl">
      <div className="p-5 md:mt-[-6rem] bg-white flex-[1]">
        <img
          className="w-full rounded-md max-h-80 xl:h-full object-cover"
          src={photoUrl}
          alt="student"
        />
      </div>
      <div className="flex-[2]">
        <h1 className="text-center font-bold mb-2  text-lg">{name}</h1>
        <p className="text-gray-600">{story}</p>
      </div>
    </div>
  );
};

export default AlumniCard;
