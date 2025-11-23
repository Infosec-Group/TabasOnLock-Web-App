export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-[2vh] left-[2vw] md:top-[5vh] md:left-[5vh] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-primary rounded-full blur-[20vw] md:blur-[10vw]">
        <div className="absolute bottom-6 right-1 w-60 h-60 bg-primary-three rounded-full blur-[300px]"></div>
      </div>
      <div className="absolute top-80 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary rounded-full blur-[150px]"></div>
      <div className="absolute top-1 right-1 w-60 h-60 bg-primary-three rounded-full blur-[300px]"></div>
      <div className="absolute bottom-20 right-20 w-[350px] h-[350px] bg-primary-two rounded-full blur-[200px]"></div>
    </div>
  );
};