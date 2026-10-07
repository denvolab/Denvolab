# `count-up/`: Stats That Count Up

`<CountUp value="40+" />` counts the first number in `value` up from 0, over 2s with `power3.out`, when its top passes 90% of the screen (once). The text before and after the number ("+", "%") stays as it is. The server renders the final value. With "Reduce motion" it shows the final value straight away. The span is marked `data-no-text-reveal`, so the site-wide line animation (`motion/text-reveal`) leaves it alone.

Used by the About page stats (`sections/about-story`). Added Oct 7, 2026.
