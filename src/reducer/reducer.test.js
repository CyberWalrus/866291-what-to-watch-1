import {reducer} from "./reducer";
import films from "../mock/films.js";

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return inital state`, () => {
    expect(reducer(undefined, {})).toEqual({
      genreFilter: `all`,
      films
    });
  });

  it(`Reducer test reset`, () => {
    expect(
        reducer(
            {
              genreFilter: `comedy`,
              films: [
                {
                  id: 4,
                  genre: `comedy`,
                  title: `Johnny English`,
                  src: `img/johnny-english.jpg`,
                  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
                },
                {
                  id: 5,
                  genre: `comedy`,
                  title: `What We Do in the Shadows`,
                  src: `img/what-we-do-in-the-shadows.jpg`,
                  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
                }
              ]
            },
            {
              type: `RESET`
            }
        )
    ).toEqual({
      genreFilter: `all`,
      films
    });
  });
  it(`Reducer test change genre`, () => {
    expect(
        reducer(
            {
              genreFilter: `all`,
              films
            },
            {
              type: `CHANGE_GENRE`,
              genreNew: `comedy`,
              filmsNew: [
                {
                  id: 4,
                  genre: `comedy`,
                  title: `Johnny English`,
                  src: `img/johnny-english.jpg`,
                  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
                },
                {
                  id: 5,
                  genre: `comedy`,
                  title: `What We Do in the Shadows`,
                  src: `img/what-we-do-in-the-shadows.jpg`,
                  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
                }
              ]
            }
        )
    ).toEqual({
      genreFilter: `comedy`,
      films: [
        {
          id: 4,
          genre: `comedy`,
          title: `Johnny English`,
          src: `img/johnny-english.jpg`,
          preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
        },
        {
          id: 5,
          genre: `comedy`,
          title: `What We Do in the Shadows`,
          src: `img/what-we-do-in-the-shadows.jpg`,
          preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
        }
      ]
    });
  });
});
