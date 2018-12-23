const kanji: HTMLElement = document.getElementById("kanji");
const answer: HTMLInputElement = document.getElementById(
  "answer"
) as HTMLInputElement;
const statusElement: HTMLElement = document.getElementById("status");
let requested: any;
let current: number = 0;
(wanakana as any).bind(answer);
// kanji level 12.
// there should be api link
fetch("kanji.json")
  .then(res => res.json())
  .then(json => {
    requested = json["requested_information"].filter(
      x => x.user_specific !== null
    );
    current = Math.floor(Math.random() * requested.length);
    kanji.innerText = requested[current].character;
  });

answer.onkeydown = (event: KeyboardEvent) => {
  if (event.keyCode === 13) {
    let value: string = (wanakana as any).toHiragana(answer.value);
    const important: string = requested[current].important_reading;
    const correctAnswers: string[] = requested[current][important]
      .split(",")
      .map(x => x.trim());
    if (correctAnswers.indexOf(value) >= 0) {
      requested.splice(current, 1);
      if (requested.length === 0) {
        statusElement.innerText = "that's it";
        answer.disabled = true;
      } else {
        current = Math.floor(Math.random() * requested.length);
        kanji.innerText = requested[current].character;
        statusElement.innerText = "";
        answer.value = "";
      }
    } else if (value.length > 0) {
      statusElement.innerText = `${requested[current].meaning} : ${
        requested[current][important]
      }`;
    }
  }
};
