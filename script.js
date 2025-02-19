{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red80\green91\blue117;\red19\green22\blue30;\red246\green249\blue255;
\red255\green255\blue255;\red111\green143\blue180;\red164\green121\blue157;\red147\green179\blue121;\red119\green179\blue197;
}
{\*\expandedcolortbl;;\cssrgb\c38824\c43529\c53333;\cssrgb\c9412\c11373\c15686;\cssrgb\c97255\c98039\c100000;
\cssrgb\c100000\c100000\c100000;\cssrgb\c50588\c63137\c75686;\cssrgb\c70588\c55686\c67843;\cssrgb\c63922\c74510\c54902;\cssrgb\c53333\c75294\c81569;
}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs25\fsmilli12573 \cf2 \cb3 \expnd0\expndtw0\kerning0
// Word Search Configuration\cf4 \
\pard\pardeftab720\partightenfactor0
\cf6 const\cf4  gridSize \cf6 =\cf4  \cf7 10\cf6 ;\cf4 \
\cf6 const\cf4  words \cf6 =\cf4  \cf6 [\cf8 "JAVASCRIPT"\cf6 ,\cf4  \cf8 "HTML"\cf6 ,\cf4  \cf8 "CSS"\cf6 ,\cf4  \cf8 "WEB"\cf6 ,\cf4  \cf8 "GAME"\cf6 ];\cf4 \
\cf6 let\cf4  selectedCells \cf6 =\cf4  \cf6 [];\cf4 \
\cf6 let\cf4  foundWords \cf6 =\cf4  \cf6 [];\cf4 \
\cf6 let\cf4  isDragging \cf6 =\cf4  \cf6 false;\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Generate the word search grid\cf4 \
\pard\pardeftab720\partightenfactor0
\cf6 const\cf4  wordsearch \cf6 =\cf4  document\cf6 .\cf9 getElementById\cf6 (\cf8 "wordsearch"\cf6 );\cf4 \
\cf6 const\cf4  wordsContainer \cf6 =\cf4  document\cf6 .\cf9 getElementById\cf6 (\cf8 "words"\cf6 );\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Display words to find\cf4 \
words\cf6 .\cf9 forEach\cf6 (\cf4 word \cf6 =>\cf4  \cf6 \{\cf4 \
  \cf6 const\cf4  wordElement \cf6 =\cf4  document\cf6 .\cf9 createElement\cf6 (\cf8 "div"\cf6 );\cf4 \
  wordElement\cf6 .\cf4 textContent \cf6 =\cf4  word\cf6 ;\cf4 \
  wordsContainer\cf6 .\cf9 appendChild\cf6 (\cf4 wordElement\cf6 );\cf4 \
\pard\pardeftab720\partightenfactor0
\cf6 \});\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Create the grid\cf4 \
\pard\pardeftab720\partightenfactor0
\cf6 for\cf4  \cf6 (let\cf4  i \cf6 =\cf4  \cf7 0\cf6 ;\cf4  i \cf6 <\cf4  gridSize\cf6 ;\cf4  i\cf6 ++)\cf4  \cf6 \{\cf4 \
  \cf6 for\cf4  \cf6 (let\cf4  j \cf6 =\cf4  \cf7 0\cf6 ;\cf4  j \cf6 <\cf4  gridSize\cf6 ;\cf4  j\cf6 ++)\cf4  \cf6 \{\cf4 \
    \cf6 const\cf4  cell \cf6 =\cf4  document\cf6 .\cf9 createElement\cf6 (\cf8 "div"\cf6 );\cf4 \
    cell\cf6 .\cf4 classList\cf6 .\cf9 add\cf6 (\cf8 "cell"\cf6 );\cf4 \
    cell\cf6 .\cf4 dataset\cf6 .\cf4 row \cf6 =\cf4  i\cf6 ;\cf4 \
    cell\cf6 .\cf4 dataset\cf6 .\cf4 col \cf6 =\cf4  j\cf6 ;\cf4 \
    cell\cf6 .\cf4 textContent \cf6 =\cf4  \cf9 getRandomLetter\cf6 ();\cf4 \
    cell\cf6 .\cf9 addEventListener\cf6 (\cf8 "mousedown"\cf6 ,\cf4  \cf6 ()\cf4  \cf6 =>\cf4  \cf9 startDrag\cf6 (\cf4 cell\cf6 ));\cf4 \
    cell\cf6 .\cf9 addEventListener\cf6 (\cf8 "mouseenter"\cf6 ,\cf4  \cf6 ()\cf4  \cf6 =>\cf4  \cf9 dragOver\cf6 (\cf4 cell\cf6 ));\cf4 \
    cell\cf6 .\cf9 addEventListener\cf6 (\cf8 "mouseup"\cf6 ,\cf4  endDrag\cf6 );\cf4 \
    wordsearch\cf6 .\cf9 appendChild\cf6 (\cf4 cell\cf6 );\cf4 \
  \cf6 \}\cf4 \
\cf6 \}\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Place words in the grid\cf4 \
words\cf6 .\cf9 forEach\cf6 (\cf4 word \cf6 =>\cf4  \cf6 \{\cf4 \
  \cf9 placeWord\cf6 (\cf4 word\cf6 );\cf4 \
\pard\pardeftab720\partightenfactor0
\cf6 \});\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Function to place a word in the grid\cf4 \
\pard\pardeftab720\partightenfactor0
\cf6 function\cf4  \cf9 placeWord\cf6 (\cf4 word\cf6 )\cf4  \cf6 \{\cf4 \
  \cf6 const\cf4  direction \cf6 =\cf4  Math\cf6 .\cf9 random\cf6 ()\cf4  \cf6 <\cf4  \cf7 0.5\cf4  \cf6 ?\cf4  \cf8 "horizontal"\cf4  \cf6 :\cf4  \cf8 "vertical"\cf6 ;\cf4 \
  \cf6 let\cf4  row\cf6 ,\cf4  col\cf6 ;\cf4 \
\
  \cf6 if\cf4  \cf6 (\cf4 direction \cf6 ===\cf4  \cf8 "horizontal"\cf6 )\cf4  \cf6 \{\cf4 \
    row \cf6 =\cf4  Math\cf6 .\cf9 floor\cf6 (\cf4 Math\cf6 .\cf9 random\cf6 ()\cf4  \cf6 *\cf4  gridSize\cf6 );\cf4 \
    col \cf6 =\cf4  Math\cf6 .\cf9 floor\cf6 (\cf4 Math\cf6 .\cf9 random\cf6 ()\cf4  \cf6 *\cf4  \cf6 (\cf4 gridSize \cf6 -\cf4  word\cf6 .\cf4 length\cf6 ));\cf4 \
    \cf6 for\cf4  \cf6 (let\cf4  i \cf6 =\cf4  \cf7 0\cf6 ;\cf4  i \cf6 <\cf4  word\cf6 .\cf4 length\cf6 ;\cf4  i\cf6 ++)\cf4  \cf6 \{\cf4 \
      \cf6 const\cf4  cell \cf6 =\cf4  document\cf6 .\cf9 querySelector\cf6 (\cf8 `.cell[data-row="\cf6 $\{\cf4 row\cf6 \}\cf8 "][data-col="\cf6 $\{\cf4 col \cf6 +\cf4  i\cf6 \}\cf8 "]`\cf6 );\cf4 \
      cell\cf6 .\cf4 textContent \cf6 =\cf4  word\cf6 [\cf4 i\cf6 ];\cf4 \
    \cf6 \}\cf4 \
  \cf6 \}\cf4  \cf6 else\cf4  \cf6 \{\cf4 \
    col \cf6 =\cf4  Math\cf6 .\cf9 floor\cf6 (\cf4 Math\cf6 .\cf9 random\cf6 ()\cf4  \cf6 *\cf4  gridSize\cf6 );\cf4 \
    row \cf6 =\cf4  Math\cf6 .\cf9 floor\cf6 (\cf4 Math\cf6 .\cf9 random\cf6 ()\cf4  \cf6 *\cf4  \cf6 (\cf4 gridSize \cf6 -\cf4  word\cf6 .\cf4 length\cf6 ));\cf4 \
    \cf6 for\cf4  \cf6 (let\cf4  i \cf6 =\cf4  \cf7 0\cf6 ;\cf4  i \cf6 <\cf4  word\cf6 .\cf4 length\cf6 ;\cf4  i\cf6 ++)\cf4  \cf6 \{\cf4 \
      \cf6 const\cf4  cell \cf6 =\cf4  document\cf6 .\cf9 querySelector\cf6 (\cf8 `.cell[data-row="\cf6 $\{\cf4 row \cf6 +\cf4  i\cf6 \}\cf8 "][data-col="\cf6 $\{\cf4 col\cf6 \}\cf8 "]`\cf6 );\cf4 \
      cell\cf6 .\cf4 textContent \cf6 =\cf4  word\cf6 [\cf4 i\cf6 ];\cf4 \
    \cf6 \}\cf4 \
  \cf6 \}\cf4 \
\cf6 \}\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Function to get a random letter\cf4 \
\pard\pardeftab720\partightenfactor0
\cf6 function\cf4  \cf9 getRandomLetter\cf6 ()\cf4  \cf6 \{\cf4 \
  \cf6 const\cf4  letters \cf6 =\cf4  \cf8 "ABCDEFGHIJKLMNOPQRSTUVWXYZ"\cf6 ;\cf4 \
  \cf6 return\cf4  letters\cf6 [\cf4 Math\cf6 .\cf9 floor\cf6 (\cf4 Math\cf6 .\cf9 random\cf6 ()\cf4  \cf6 *\cf4  letters\cf6 .\cf4 length\cf6 )];\cf4 \
\cf6 \}\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Drag and drop functionality\cf4 \
\pard\pardeftab720\partightenfactor0
\cf6 function\cf4  \cf9 startDrag\cf6 (\cf4 cell\cf6 )\cf4  \cf6 \{\cf4 \
  isDragging \cf6 =\cf4  \cf6 true;\cf4 \
  selectedCells \cf6 =\cf4  \cf6 [\cf4 cell\cf6 ];\cf4 \
  cell\cf6 .\cf4 classList\cf6 .\cf9 add\cf6 (\cf8 "selected"\cf6 );\cf4 \
\cf6 \}\cf4 \
\
\cf6 function\cf4  \cf9 dragOver\cf6 (\cf4 cell\cf6 )\cf4  \cf6 \{\cf4 \
  \cf6 if\cf4  \cf6 (\cf4 isDragging \cf6 &&\cf4  \cf6 !\cf4 selectedCells\cf6 .\cf9 includes\cf6 (\cf4 cell\cf6 ))\cf4  \cf6 \{\cf4 \
    selectedCells\cf6 .\cf9 push\cf6 (\cf4 cell\cf6 );\cf4 \
    cell\cf6 .\cf4 classList\cf6 .\cf9 add\cf6 (\cf8 "selected"\cf6 );\cf4 \
  \cf6 \}\cf4 \
\cf6 \}\cf4 \
\
\cf6 function\cf4  \cf9 endDrag\cf6 ()\cf4  \cf6 \{\cf4 \
  isDragging \cf6 =\cf4  \cf6 false;\cf4 \
  \cf9 checkForWord\cf6 ();\cf4 \
\cf6 \}\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Function to check if selected cells form a word\cf4 \
\pard\pardeftab720\partightenfactor0
\cf6 function\cf4  \cf9 checkForWord\cf6 ()\cf4  \cf6 \{\cf4 \
  \cf6 const\cf4  selectedWord \cf6 =\cf4  selectedCells\cf6 .\cf9 map\cf6 (\cf4 cell \cf6 =>\cf4  cell\cf6 .\cf4 textContent\cf6 ).\cf9 join\cf6 (\cf8 ""\cf6 );\cf4 \
  \cf6 if\cf4  \cf6 (\cf4 words\cf6 .\cf9 includes\cf6 (\cf4 selectedWord\cf6 )\cf4  \cf6 &&\cf4  \cf6 !\cf4 foundWords\cf6 .\cf9 includes\cf6 (\cf4 selectedWord\cf6 ))\cf4  \cf6 \{\cf4 \
    foundWords\cf6 .\cf9 push\cf6 (\cf4 selectedWord\cf6 );\cf4 \
    selectedCells\cf6 .\cf9 forEach\cf6 (\cf4 cell \cf6 =>\cf4  cell\cf6 .\cf4 classList\cf6 .\cf9 add\cf6 (\cf8 "found"\cf6 ));\cf4 \
    selectedCells \cf6 =\cf4  \cf6 [];\cf4 \
\
    \cf2 // Mark the word as found in the word list\cf4 \
    \cf6 const\cf4  wordElements \cf6 =\cf4  wordsContainer\cf6 .\cf9 querySelectorAll\cf6 (\cf8 "div"\cf6 );\cf4 \
    wordElements\cf6 .\cf9 forEach\cf6 (\cf4 el \cf6 =>\cf4  \cf6 \{\cf4 \
      \cf6 if\cf4  \cf6 (\cf4 el\cf6 .\cf4 textContent \cf6 ===\cf4  selectedWord\cf6 )\cf4  \cf6 \{\cf4 \
        el\cf6 .\cf4 classList\cf6 .\cf9 add\cf6 (\cf8 "found"\cf6 );\cf4 \
      \cf6 \}\cf4 \
    \cf6 \});\cf4 \
\
    \cf6 if\cf4  \cf6 (\cf4 foundWords\cf6 .\cf4 length \cf6 ===\cf4  words\cf6 .\cf4 length\cf6 )\cf4  \cf6 \{\cf4 \
      \cf9 alert\cf6 (\cf8 "Good Job Big Dog!"\cf6 );\cf4 \
    \cf6 \}\cf4 \
  \cf6 \}\cf4  \cf6 else\cf4  \cf6 \{\cf4 \
    selectedCells\cf6 .\cf9 forEach\cf6 (\cf4 cell \cf6 =>\cf4  cell\cf6 .\cf4 classList\cf6 .\cf9 remove\cf6 (\cf8 "selected"\cf6 ));\cf4 \
    selectedCells \cf6 =\cf4  \cf6 [];\cf4 \
  \cf6 \}\cf4 \
\cf6 \}\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Reset button functionality\cf4 \
document\cf6 .\cf9 getElementById\cf6 (\cf8 "reset-button"\cf6 ).\cf9 addEventListener\cf6 (\cf8 "click"\cf6 ,\cf4  \cf6 ()\cf4  \cf6 =>\cf4  \cf6 \{\cf4 \
  wordsearch\cf6 .\cf4 innerHTML \cf6 =\cf4  \cf8 ""\cf6 ;\cf4 \
  wordsContainer\cf6 .\cf4 innerHTML \cf6 =\cf4  \cf8 "<div>Words to find:</div>"\cf6 ;\cf4 \
  selectedCells \cf6 =\cf4  \cf6 [];\cf4 \
  foundWords \cf6 =\cf4  \cf6 [];\cf4 \
  \cf9 initializeGame\cf6 ();\cf4 \
\pard\pardeftab720\partightenfactor0
\cf6 \});\cf4 \
\
\cf6 function\cf4  \cf9 initializeGame\cf6 ()\cf4  \cf6 \{\cf4 \
  \cf2 // Reinitialize the game\cf4 \
  words\cf6 .\cf9 forEach\cf6 (\cf4 word \cf6 =>\cf4  \cf6 \{\cf4 \
    \cf6 const\cf4  wordElement \cf6 =\cf4  document\cf6 .\cf9 createElement\cf6 (\cf8 "div"\cf6 );\cf4 \
    wordElement\cf6 .\cf4 textContent \cf6 =\cf4  word\cf6 ;\cf4 \
    wordsContainer\cf6 .\cf9 appendChild\cf6 (\cf4 wordElement\cf6 );\cf4 \
  \cf6 \});\cf4 \
\
  \cf6 for\cf4  \cf6 (let\cf4  i \cf6 =\cf4  \cf7 0\cf6 ;\cf4  i \cf6 <\cf4  gridSize\cf6 ;\cf4  i\cf6 ++)\cf4  \cf6 \{\cf4 \
    \cf6 for\cf4  \cf6 (let\cf4  j \cf6 =\cf4  \cf7 0\cf6 ;\cf4  j \cf6 <\cf4  gridSize\cf6 ;\cf4  j\cf6 ++)\cf4  \cf6 \{\cf4 \
      \cf6 const\cf4  cell \cf6 =\cf4  document\cf6 .\cf9 createElement\cf6 (\cf8 "div"\cf6 );\cf4 \
      cell\cf6 .\cf4 classList\cf6 .\cf9 add\cf6 (\cf8 "cell"\cf6 );\cf4 \
      cell\cf6 .\cf4 dataset\cf6 .\cf4 row \cf6 =\cf4  i\cf6 ;\cf4 \
      cell\cf6 .\cf4 dataset\cf6 .\cf4 col \cf6 =\cf4  j\cf6 ;\cf4 \
      cell\cf6 .\cf4 textContent \cf6 =\cf4  \cf9 getRandomLetter\cf6 ();\cf4 \
      cell\cf6 .\cf9 addEventListener\cf6 (\cf8 "mousedown"\cf6 ,\cf4  \cf6 ()\cf4  \cf6 =>\cf4  \cf9 startDrag\cf6 (\cf4 cell\cf6 ));\cf4 \
      cell\cf6 .\cf9 addEventListener\cf6 (\cf8 "mouseenter"\cf6 ,\cf4  \cf6 ()\cf4  \cf6 =>\cf4  \cf9 dragOver\cf6 (\cf4 cell\cf6 ));\cf4 \
      cell\cf6 .\cf9 addEventListener\cf6 (\cf8 "mouseup"\cf6 ,\cf4  endDrag\cf6 );\cf4 \
      wordsearch\cf6 .\cf9 appendChild\cf6 (\cf4 cell\cf6 );\cf4 \
    \cf6 \}\cf4 \
  \cf6 \}\cf4 \
\
  words\cf6 .\cf9 forEach\cf6 (\cf4 word \cf6 =>\cf4  \cf6 \{\cf4 \
    \cf9 placeWord\cf6 (\cf4 word\cf6 );\cf4 \
  \cf6 \});\cf4 \
\cf6 \}}