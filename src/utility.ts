const parseLevel = (music: HTMLLIElement) => {
  const levelDOM = music.children[1] as HTMLDivElement;
  const levelText = levelDOM.textContent as string;
  const levels = levelText.split(' / ').map((levelText) => Number(levelText));
  return {
    easy: levels[0],
    normal: levels[1],
    hard: levels[2],
  };
};

type Difficulty = keyof ReturnType<typeof parseLevel>;
type Levels = { [key in string]: ReturnType<typeof parseLevel> };

const parseLevels = () => {
  const musicList = document.getElementsByClassName(
    'music-list-item',
  ) as HTMLCollectionOf<HTMLLIElement>;
  const levels = {} as Levels;
  for (let i = 0; i < musicList.length; i += 1) {
    const music = musicList[i];
    levels[music.id] = parseLevel(music);
  }
  return levels;
};

type Record = {
  clear: boolean;
  complete: boolean;
  perfect: boolean;
  score: number;
};

type RecordList = {
  [key in string]: {
    easy?: Record;
    normal?: Record;
    hard?: Record;
  };
};

const calcRate = (score: number) => {
  if (score < 950000) {
    return (score - 900000) / 20000;
  }
  return (score - 950000) / 10000 + 2.5;
};

const distributeMusic = (levels: Levels, records: RecordList, key: string) => {
  const record = records[key];
  const levelDict = levels[key];
  return (['easy', 'normal', 'hard'] as Difficulty[]).reduce(
    (pre, difficulty) => {
      if (typeof record[difficulty] === 'undefined') {
        return [...pre];
      }
      const score = record[difficulty]?.score as number;
      const rate = calcRate(score) + levelDict[difficulty];
      return [...pre, rate];
    },
    [] as number[],
  );
};

const distributeRecords = () => {
  const records = JSON.parse(localStorage.records) as RecordList;
  const levels = parseLevels();
  return Object.keys(records).reduce(
    (pre, key) => [...pre, ...distributeMusic(levels, records, key)],
    [] as number[],
  );
};

const COUNT = 20;

const calcPlayerRate = () => {
  const rates = distributeRecords().sort((a, b) => b - a);
  const sum = rates.slice(0, COUNT).reduce((pre, cur) => pre + cur, 0);
  return sum / COUNT;
};

export { calcPlayerRate };
