# This is a Custom Range App

You can find the online version in production [here](https://custom-range.vercel.app/)

This custom range app shows a fixed range slider or a normal one.

The solution was to create a <Range /> slider with a isFixedRange boolean prop, which renders <NormalRange /> or <FixedRange /> depending on this boolean prop.

Both range sliders are componsed of this subcomponents:

- Label x2: Represents the current value of the minimium or maximum constraint value of the range. In <NormalRange /> they will be number inputs and in <FixedRange /> they will be just text.
- RangeLine: Represents the UI of the line of the slider
- Bullet x2: Represent the bullets to be dragged to change the min and max range constraints.

Both range sliders take their constraint values (min and max for the NormalSlider, and rangeValues for the FixedSlider) from a mocked API when mounted.

While mounting, they also set an Event Listener on document for the mouseup event, so when the user lifts its finger after mouse-clicking. This fires a handleMouseUp function which sets isDragging to false and activeBullet to null.

# Common logic for both ranges

## State

- min: min value that represents the minimum constraint of the range returned by the API
- max: max value that represents the maximum constraint of the range returned by the API
- minValue (NormalRange) / minNormalizedValue (FixedRange): min normalized (%) value of the min bullet. Since the bullet moves on a line with length 100%, minValue is the percentage of possition offset of the bullet in this line
- maxValue (NormalRange) / maxNormalizedValue (FixedRange): max normalized (%) value of the max bullet. Since the bullet moves on a line with length 100%, maxValue is the percentage of possition offset of the bullet in this line
- minValue (NormalRange) / minLabelValue (FixedRange): min real value of the min bullet within the range of values constrained by min and max.
- maxValue (NormalRange) / maxLabelValue (FixedRange): max real value of the max bullet within the range of values constrained by min and max.
- isDragging: if the
- Active bullet: Represents the bullet of the range being mouse-dragged
- isDragging: Used for determining if the user is currently dragging a bullet in that moment.
- loading: Used to show an skelleton while waiting for the API answer.
- onTopBullet: Used to be sure that the last bullet moved remains on top of the toher one using a greater z-index. Used for preventing the inability of the user to drag the right bullet at the end of the line in case both are at the end and the one that needs to be moved to unlock the other one is at the bottom in the z-index scale.
- error: text error to show if the API call fails

## Functionality.

- handleButtonMouseDown: activates when the user clicks and holds on one bullet. It lets the user drag the selected bullet and update its normalized and real values while dragging.

# Unique logic

## Normal Range

While both sliders have basic accesibility so the user is able to know the bullet values with a screen reader, the normal range component also provides interactivity by allowing to move both bullets with the left and right keyboard keys. It also makes both bullets focusable with the tab key.

## Fixed Range

Since the allowed bullet values are only the ones provided by the valuesRange, this range implements a function to get the closest value to the current cursor location while dragging the bullet on the line. This works by normalizing the valuesRange from 0 to 100, find the closest value of the current pointer position in % on the range line, and then denormalize it again to get the real corresponding value in the valuesRange and show it on the label.
