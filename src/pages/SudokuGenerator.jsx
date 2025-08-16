import React, { useEffect, useState } from "react";
import { Box, Center, Select, Button, Title, Stack } from "@mantine/core";
import { generateSudoku } from "../js/sudokuGenerator";

const SudokuGenerator = () => {
  const [matrix, setMatrix] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");

  const regenerate = () => {
    const mat = generateSudoku(difficulty);
    setMatrix(mat);
  };

  useEffect(() => {
    regenerate();
  }, [difficulty]);

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
      <Title order={2} mb="lg" ta="center">
        Sudoku Generator
      </Title>

      <Stack spacing="md" align="center" mb="lg">
        <Select
          label="Select Difficulty"
          value={difficulty}
          onChange={setDifficulty}
          data={[
            { value: "easy", label: "Easy" },
            { value: "medium", label: "Medium" },
            { value: "hard", label: "Hard" },
          ]}
          placeholder="Choose difficulty"
          style={{ width: 250 }}
        />
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

            return (
              <Center
                key={`${row}-${col}`}
                style={{
                  width: 40,
                  height: 40,
                  fontSize: 16,
                  fontWeight: 600,
                  backgroundColor: value === 0 ? "#f1f3f5" : "white",
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

export default SudokuGenerator;
