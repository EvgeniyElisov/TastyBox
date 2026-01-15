type Props = {
  text: string;
  url: string;
};

export const EmailInfoText = ({ text, url }: Props) => {
  return (
    <>
      <p className="m-0 text-gray-500 text-sm leading-relaxed text-center">
        {text}
        <br />
        Если кнопка не работает, скопируйте ссылку:
      </p>
      <p className="mt-2.5 mb-0 text-center break-all">
        <a href={url} className="text-blue-500 text-xs no-underline">
          {url}
        </a>
      </p>
    </>
  );
};
