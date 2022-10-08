import Block from "../../utils/Block";
import template from "./sign-in.pug";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import "./styles.css";

interface SignInProps {
  title: string;
  classes?: string;
  url?: string;
  children?: {
    fields: Block[];
    footer: Block[];
  };
}

export class SignIn extends Block {
  constructor(props: SignInProps) {
    super(props);
  }

  init() {
    const fields = [
      new Input({
        label: "Логин",
        idInput: "login",
        type: "text",
        classes: "field",
        inputClasses: "input",
        events: {
          focusin: () => {
            const loginL = document.querySelector(
              `#${this.children.fields[0].props.idInput}`
            );
            loginL?.classList.remove("field__input_error");
          },
        },
      }),
      new Input({
        label: "Пароль",
        idInput: "password",
        type: "password",
        classes: "field",
        inputClasses: "input",
        events: {
          focusin: () => {
            const loginL = document.querySelector(
              `#${this.children.fields[1].props.idInput}`
            );
            loginL?.classList.remove("field__input_error");
          },
        },
      }),
    ];
    this.children.fields = fields;

    const buttons = [
      new Button({
        label: "Войти",
        events: {
          click: () => {
            event.preventDefault();
            const valid = this.children.fields.reduce((acc, val) => {
              const result = val.onValidate();
              return acc && result;
            }, true);
            const logLog = document.querySelector(
              `#${this.children.fields[0].props.idInput}`
            )!.value;
            const logPass = document.querySelector(
              `#${this.children.fields[1].props.idInput}`
            )!.value;
            if (valid) {
              console.log({ login: logLog, password: logPass });
            }
          },
        },
        classes: "button main__button",
        type: "submit",
      }),
    ];
    this.children.actions = buttons;
  }

  render() {
    return this.compile(template, { title: this.props.title });
  }
}