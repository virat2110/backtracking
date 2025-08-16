import { Button, Center, Stack } from "@mantine/core";
import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/sudoku/generator">Sudoku Generator</a>
          </li>
          <li>
            <a href="/sudoku/solver">Sudoku Solver</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
