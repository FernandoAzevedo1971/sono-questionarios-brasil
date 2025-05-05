
import { VolumeX, LucideAlarmClock, Eye, Heart, Scale, Clock, User, UserCircle2 } from "lucide-react";
import { StopBangQuestionItem } from "./types";

export const stopBangQuestions: StopBangQuestionItem[] = [
  {
    id: "snoring",
    letter: "S",
    text: "noring (Roncos)",
    description: "Você ronca alto (alto o suficiente que pode ser ouvido através de portas fechadas ou seu companheiro cutuca você à noite para parar de roncar)?",
    icon: VolumeX
  },
  {
    id: "tired",
    letter: "T",
    text: "iredness (Cansado)",
    description: "Você frequentemente se sente cansado, exausto ou sonolento durante o dia (como, por exemplo, adormecer enquanto dirige)?",
    icon: LucideAlarmClock
  },
  {
    id: "observed",
    letter: "O",
    text: "bserved apnea (apneia observada)",
    description: "Alguém observou que você para de respirar ou engasga/fica ofegante durante o seu sono?",
    icon: Eye
  },
  {
    id: "pressure",
    letter: "P",
    text: "ressure (pressão arterial elevada)",
    description: "Você tem ou está sendo tratado para pressão sanguínea alta?",
    icon: Heart
  },
  {
    id: "bmi",
    letter: "B",
    text: "MI (IMC)",
    description: "Índice de massa corporal maior que 35 kg/m²?",
    icon: Scale
  },
  {
    id: "age",
    letter: "A",
    text: "ge (Idade)",
    description: "Idade acima de 50 anos?",
    icon: Clock
  },
  {
    id: "neck",
    letter: "N",
    text: "eck Circumference (Circunferência do pescoço)",
    description: "Circunferência do pescoço 43 cm ou mais no homem ou 41 cm ou mais na mulher?",
    icon: User
  },
  {
    id: "gender",
    letter: "G",
    text: "ender (Sexo)",
    description: "Sexo = Masculino?",
    icon: UserCircle2
  }
];
