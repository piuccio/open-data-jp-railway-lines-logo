## List of Japanese railways logo

The list is generated from this [Wikipedia page](https://ja.m.wikipedia.org/wiki/%E9%A7%85%E3%83%8A%E3%83%B3%E3%83%90%E3%83%AA%E3%83%B3%E3%82%B0).

A list of colors is available on this [page](https://ja.m.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E3%81%AE%E9%89%84%E9%81%93%E3%83%A9%E3%82%A4%E3%83%B3%E3%82%AB%E3%83%A9%E3%83%BC%E4%B8%80%E8%A6%A7) but it's not part of this dataset yet.

### Usage

Just grab the file `logos.json` it has a list of objects with the structure

```json
{
  "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/JR_JT_line_symbol.svg/28px-JR_JT_line_symbol.svg.png",
  "text": "東海道線"
},
```

The data is rough, it's simply extracting any image from the above page and the text immediately adjacent.

For a more polished list have a look at [open-data-jp-railway-lines](https://github.com/piuccio/open-data-jp-railway-lines), the lines listed there have a `logo` when one was found.


## Related links

More [open data repositories](https://github.com/piuccio?utf8=%E2%9C%93&tab=repositories&q=open-data-jp&type=&language=).

You can also find a list of all GeoJSON prefectures on [this repository](https://github.com/dataofjapan/land).
