// import {
//    BEFORE_START,
//    ZERO,
//    EMPTY,
//    CROSS,
//    WINNER_COMBINATIONS,
//    GAME_IS_RUNNING,
// } from "../constants";

export const BEFORE_START = "before_start";
export const GAME_IS_RUNNING = "game_is_running";
export const GAME_IS_END = "game_is_end";
export const CROSS = "X";
export const ZERO = "O";
export const EMPTY = "None";
export const WINNER_COMBINATIONS = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];

function getClearBoard() {
   return [
      "None",
      "None",
      "None",
      "None",
      "None",
      "None",
      "None",
      "None",
      "None",
   ];
}

function checkIsGameEnd(map) {
   return WINNER_COMBINATIONS.some((combination) => {
      combination.every((pos) => map[pos] === CROSS) ||
         combination.every((pos) => map[pos] === ZERO);
   });
}

export class Board {
   static instance;
   map = getClearBoard();
   steps = [];
   status = BEFORE_START;

   constructor() {}

   static getInstance() {
      if (!Board.instance) {
         Board.instance = new Board();
      }

      return Board.instance;
   }

   getGameState() {
      return { map: this.map, steps: this.steps, status: this.status };
   }

   reset() {
      this.status = BEFORE_START;
      this.map = getClearBoard();
      this.steps = [];
   }

   checkGameEnd() {
      const isGameEnd = this.steps.length >= 5 && checkIsGameEnd(this.map);

      if (isGameEnd) {
         this.status = GAME_IS_END;
      }
   }

   firstStep(stepData) {
      const isFieldCorrect = stepData.field >= 0 && stepData.field <= 8;
      const isMapEmpty = this.map.every((f) => f === "None");
      const isStepsLengthZero = this.steps.length === 0;

      if (isFieldCorrect && isMapEmpty && isStepsLengthZero) {
         const step = {
            id: 0,
            prevStepId: undefined,
            field: stepData.field,
         };

         this.steps = [step];
         this.map = this.map[stepData.field] = ZERO;
         this.status = GAME_IS_RUNNING;

         return { result: true };
      } else {
         return { result: false };
      }
   }

   step(stepData) {
      const isProgession =
         this.step.length > 0 &&
         this.step.slice(-1)[0].id === stepData.prevStepId;
      const isFieldCorrect =
         stepData.field >= 0 &&
         stepData.field <= 8 &&
         this.map[stepData.field] === EMPTY;
      const isGameRunning = this.status === GAME_IS_RUNNING;

      if (isProgession && isFieldCorrect && isGameRunning) {
         const step = {
            id: this.steps.length,
            prevStepId: this.steps.length - 1,
            field: stepData.field,
         };

         this.steps = [...this.steps, step];
         this.map = this.map[stepData.field] =
            this.steps.length % 2 === 1 ? ZERO : CROSS;

         this.checkGameEnd();

         return { result: true };
      } else {
         return { result: false };
      }
   }
}
