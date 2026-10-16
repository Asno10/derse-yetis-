# Derse Yetiş

A small web app for commuting from Evka 4 to Ege University's Faculty of Engineering by ESHOT bus (565, 566, 568 or 585) and İzmir Metro. It tells you when to leave home for your next lecture.

- Uses ESHOT's official timetables and route geometry for the four Evka 4 to Bornova Metro lines, İzmir Metro frequencies and İzmir Metropolitan Municipality's open data live bus service.
- A Monte Carlo model combines those with the trips you log, so predictions adapt to your real travel times.
- Works offline once installed. Add it to your home screen from Safari (Share, then Add to Home Screen).

## Privacy

Everything you enter (name, timetable, trips) is stored only in your own browser on your own device. This site has no backend, no accounts, no cookies, no analytics and no third-party fonts. The only outside request is to `openapi.izmir.bel.tr`, which receives the bus stop number to return approaching buses.

Fonts: Barlow Condensed, Overpass and DotGothic16 (SIL Open Font License), self-hosted from Fontsource.
