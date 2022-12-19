export const BEFORE_START = "before_start";
export const RUNNING = "running";
export const END = "finished";
export const CROSS = "X";
export const ZERO = "O";
export const EMPTY = " ";

function getClearMap() {
   return Array(10).join(EMPTY).split('')
}

const WIN_COMBINATION = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];

function checkIsGameEnd(map) {
   return WIN_COMBINATION.some((combination) => {
      return (
         combination.every((position) => map[position] === CROSS) ||
         combination.every((position) => map[position] === ZERO)
      );
   });
}

export class Board {
   static instance;
   map = getClearMap();
   steps = [];
   status = BEFORE_START;

   constructor() {}

   static getInstance() {
      if (!Board.instance) {
         Board.instance = new Board();
      }

      return Board.instance;
   }

   getCurrentGameState() {
      return { map: this.map, steps: this.steps, status: this.status };
   }

   clear() {
      this.status = BEFORE_START;
      this.map = getClearMap();
      this.steps = [];
   }

   firstStep(stepData) {
      const isFieldCorrect = stepData.field >= 0 && stepData.field <= 8;
      const isMapEmpty = this.map.every((f) => f === EMPTY);
      const isStepsLengthZero = this.steps.length === 0;

      if (isStepsLengthZero && isMapEmpty && isFieldCorrect) {
         const step = {
            id: 0,
            prevStepId: undefined,
            field: stepData.field,
         };

         this.steps = [step];
         this.map[stepData.field] = ZERO;
         this.status = RUNNING;

         return { result: true };
      } else {
         return { result: false };
      }
   }

   step(stepData) {
      const isProgression =
         this.steps.length > 0 &&
         this.steps.slice(-1)[0].id === stepData.prevStepId;
      const isFieldCorrect =
         stepData.field >= 0 &&
         stepData.field <= 8 &&
         this.map[stepData.field] === EMPTY;
      const isGameStatusCorrect = this.status === RUNNING;

      if (isProgression && isFieldCorrect && isGameStatusCorrect) {
         const step = {
            id: this.steps.length,
            prevStepId: this.steps.length - 1,
            field: stepData.field,
         };

         const fieldData = this.steps.length % 2 === 1 ? CROSS : ZERO;

         this.steps = [...this.steps, step];
         this.map[stepData.field] = fieldData;
         this.checkGameEnd();

         return { result: true };
      } else {
         return { result: false };
      }
   }

   checkGameEnd() {
      const isGameEnd = this.steps.length >= 5 && checkIsGameEnd(this.map);

      console.log(this.steps.slice(-1)[0].id % 2 === 1 ? CROSS : ZERO);

      if (isGameEnd) {
         this.status = END;
      }
   }
}
