export const validators = {
  onlyCyrilic(txt) {
    if (txt.length && !txt.match(/^[а-яА-ЯёЁ]+$/g)) {
      return "Только русские буквы";
    }
  },
  onlyLatin(txt) {
    if (txt.length && !txt.match(/^[a-zA-Z]+$/g)) {
      return "Только английские буквы";
    }
  },
  date(txt) {
    if (new Date("1900-01-01") > new Date(txt)) {
      return "Некорректная дата";
    }
  },
  email(txt) {
    if (txt.length && !txt.match(/^[A-Z0-9._-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i)) {
      return "Некорректный Email";
    }
  },
  passportSeries(txt) {
    if (txt.length && !txt.match(/^\d{4}$/)) {
      return "Только 4 цифры";
    }
  },
  passportNumber(txt) {
    if (txt.length && !txt.match(/^\d{6}$/)) {
      return "Только 6 цифр";
    }
  },
  nonEmpty: (txt) => {
    if (!txt) {
      return "Поле должно быть не пустым";
    }
  },
};
