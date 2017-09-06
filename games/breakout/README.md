# An implementation of Breakout

[Play Breakout](https://ryanbard.github.io/javascript-coding-katas/games/breakout/breakout.html)

TODO

Notes:

Project inspired by (rules and look influenced by combinations of):

* [https://en.wikipedia.org/wiki/Breakout_(video_game)](https://en.wikipedia.org/wiki/Breakout_(video_game))
* [https://www.youtube.com/watch?v=IpVIufJ4qoU](https://www.youtube.com/watch?v=IpVIufJ4qoU)
* [https://www.youtube.com/watch?v=MTnhlAlzb6Y](https://www.youtube.com/watch?v=MTnhlAlzb6Y)
* [https://www.youtube.com/watch?v=JRAPnuwnpRs](https://www.youtube.com/watch?v=JRAPnuwnpRs)
* [https://www.youtube.com/watch?v=QIs3UOTdsJM](https://www.youtube.com/watch?v=QIs3UOTdsJM)



18 x black
18 x black
18 x black
18 x black

18 x red
18 x orange
18 x orange
18 x yellow
18 x green
18 x blue

~17 x 18 x black, with paddle on line 1

block size seems to be about 6 x 2
paddle size seems to be about 8 x 2
walls around the game are 6 thick
ball size is 1 x 1

apparently there are six angles for bounce


or

14 x red
14 x red
(7 point each, 196 total)

14 x orange
14 x orange
(5 point each, 140 total)

14 x green
14 x green
(3 point each, 84 total)

14 x yellow
14 x yellow
(1 point each, 28 total)

2 screens full of bricks
(max score is 896, 448 x 2 screens)

3 lives (5 if atari 2600)

if hit upper wall (past the red bricks), half paddle size for rest of game

after 4 hits, ball speed++
if atari 2600, after 8 hits, ball speed++
after 12 hits, ball speed++
after hit first orange brick, speed=maxSpeed (which is faster than the 12 hits speed)
after hit first red brick, speed=maxSpeed (which is faster than the 12 hits speed)
reset speed when dropping a new ball (lives--)
