# Detail card: show hero background and blurred logo

## Problem
The hero background and blurred logo never appear because they are drawn **behind** the RoundedBox’s front face (z from -0.025 to 0.025). The hero and logo were at z=0.005 and z=0.01, so the glass front face (z=0.025) was in front of them and hid them.

## Fix (in `SolutionsRing3D.tsx`, in `DetailCardRight`)

Draw the hero and logo **in front** of the RoundedBox by using z values **greater than 0.025**:

1. **Hero background plane**  
   Change:
   - `position={[0, 0, 0.005]}`
   to:
   - `position={[0, 0, 0.03]}`

2. **Blurred logo plane**  
   Change:
   - `position={[0, 0, 0.01]}`
   to:
   - `position={[0, 0, 0.032]}`

3. **Title Text**  
   Change:
   - `position={[0, 1.32, 0.026]}`
   to:
   - `position={[0, 1.32, 0.034]}`

4. **Description Text**  
   Change:
   - `position={[0, 0, 0.026]}`
   to:
   - `position={[0, 0, 0.034]}`

Resulting order (back to front): RoundedBox (glass) → hero → blurred logo → title → description. The hero and logo are no longer behind the glass, so they stay visible.
