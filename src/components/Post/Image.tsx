function Image({ imageSrc, username }: { imageSrc: string; username: string }) {
  return (
    <div className="max-h-640 overflow-hidden flex items-center justify-center">
      <img src={imageSrc} alt={`${username} post`} />
    </div>
  );
}

export default Image;
