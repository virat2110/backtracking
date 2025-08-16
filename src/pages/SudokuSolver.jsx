import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Center,
  Button,
  Select,
  Title,
  Stack,
  Group,
  Slider,
  Text,
} from "@mantine/core";
import { generateSudoku } from "../js/sudokuGenerator";
import { getSolvingSteps } from "../js/sudokuSolver";

const SudokuSolver = () => {
  const [matrix, setMatrix] = useState([]);
  const [originalMatrix, setOriginalMatrix] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isSolving, setIsSolving] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [currentStep, setCurrentStep] = useState(null);
  const intervalRef = useRef(null);

  const generatePuzzle = () => {
    const puzzle = generateSudoku(difficulty);
    setMatrix(puzzle.map((r) => [...r]));
    setOriginalMatrix(puzzle.map((r) => [...r]));
    setIsSolving(false);
    setIsPaused(false);
    setStepIndex(0);
    setSteps([]);
    setCurrentStep(null);
    clearInterval(intervalRef.current);
  };

  const advanceStep = useCallback(() => {
    if (stepIndex >= steps.length) {
      clearInterval(intervalRef.current);
      setIsSolving(false);
      setIsPaused(false);
      setCurrentStep(null);
      return;
    }

    const step = steps[stepIndex];

    setMatrix((prev) => {
      const updated = prev.map((r) => [...r]);
      updated[step.row][step.col] = step.value;
      return updated;
    });

    setCurrentStep(step);
    setStepIndex((prev) => prev + 1);
  }, [stepIndex, steps]);

  const goBackStep = () => {
    if (stepIndex === 0) return;

    const prevStep = steps[stepIndex - 1];

    setMatrix((prev) => {
      const updated = prev.map((r) => [...r]);
      updated[prevStep.row][prevStep.col] =
        originalMatrix[prevStep.row][prevStep.col] || 0;
      return updated;
    });

    setStepIndex((prev) => prev - 1);
    setCurrentStep(steps[stepIndex - 2] || null);
  };

  useEffect(() => {
    if (isSolving && !isPaused) {
      intervalRef.current = setInterval(() => {
        advanceStep();
      }, speed);
    }

    return () => clearInterval(intervalRef.current);
  }, [isSolving, isPaused, speed, advanceStep]);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setMatrix(originalMatrix.map((r) => [...r]));
    setIsSolving(false);
    setIsPaused(false);
    setStepIndex(0);
    setCurrentStep(null);
  };

  const animateSolve = () => {
    const solvingSteps = getSolvingSteps(matrix.map((r) => [...r]));
    setSteps(solvingSteps);
    setIsSolving(true);
    setIsPaused(false);
    setStepIndex(0);
  };

  useEffect(() => {
    generatePuzzle();
  }, []);

  return (
    <Box
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Title order={2} mb="lg">
        Sudoku Solver
      </Title>

      <Stack spacing="sm" align="center" mb="lg">
        <Select
          label="Select Difficulty"
          value={difficulty}
          onChange={setDifficulty}
          data={[
            { value: "easy", label: "Easy" },
            { value: "medium", label: "Medium" },
            { value: "hard", label: "Hard" },
          ]}
          style={{ width: 200 }}
          disabled={isSolving}
        />

        <Group>
          <Button onClick={generatePuzzle} disabled={isSolving} color="blue">
            Generate Puzzle
          </Button>
          <Button onClick={animateSolve} disabled={isSolving} color="orange">
            Solve with Animation
          </Button>
          <Button onClick={handleReset} disabled={!isSolving} color="red">
            Reset
          </Button>
        </Group>

        {isSolving && (
          <Group>
            <Button onClick={togglePause}>
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button
              onClick={() => advanceStep()}
              disabled={!isPaused || stepIndex >= steps.length}
            >
              ▶ Step Forward
            </Button>
            <Button onClick={goBackStep} disabled={!isPaused || stepIndex <= 0}>
              ◀ Step Backward
            </Button>
          </Group>
        )}

        <Box style={{ width: 250 }}>
          <Text size="sm" mb={4}>
            Animation Speed: {speed} ms
          </Text>
          <Slider
            min={10}
            max={500}
            step={10}
            value={speed}
            onChange={setSpeed}
            disabled={isSolving && !isPaused}
          />
        </Box>
      </Stack>

      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 40px)",
          gridTemplateRows: "repeat(9, 40px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        {matrix.map((rowData, row) =>
          rowData.map((value, col) => {
            const isTopThick = row % 3 === 0;
            const isLeftThick = col % 3 === 0;
            const isLastRow = row === 8;
            const isLastCol = col === 8;

            const isCurrent =
              currentStep?.row === row && currentStep?.col === col;
            let backgroundColor = value === 0 ? "#f1f3f5" : "white";

            if (isCurrent) {
              backgroundColor =
                currentStep.type === "backtrack" ? "#ff6b6b" : "#51cf66";
            }

            return (
              <Center
                key={`${row}-${col}`}
                style={{
                  width: 40,
                  height: 40,
                  fontSize: 16,
                  fontWeight: 600,
                  backgroundColor,
                  transition: "background-color 0.2s ease",
                  borderTop: isTopThick ? "2px solid black" : "1px solid #ccc",
                  borderLeft: isLeftThick
                    ? "2px solid black"
                    : "1px solid #ccc",
                  borderRight: isLastCol ? "2px solid black" : undefined,
                  borderBottom: isLastRow ? "2px solid black" : undefined,
                }}
              >
                {value !== 0 ? value : ""}
              </Center>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default SudokuSolver;
