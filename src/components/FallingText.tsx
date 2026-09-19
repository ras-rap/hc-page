interface Props {
  text: string;
  active: boolean;
}

export function FallingText({ text, active }: Props) {
  return (
    <span aria-label={text}>
      {Array.from(text).map((character, index) => {
        const shouldFall = /[a-z]/i.test(character) && (index % 11 === 4 || index % 17 === 9);
        return (
          <span
            key={`${character}-${index}`}
            className={shouldFall ? 'falling-letter' : undefined}
            data-active={active}
            aria-hidden="true"
            style={shouldFall ? { animationDelay: `${index * 35}ms` } : undefined}
          >
            {character}
          </span>
        );
      })}
    </span>
  );
}
