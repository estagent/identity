import Bowser from 'bowser'

const UA = window.navigator.userAgent

const parser = Bowser.getParser(UA)

export const getParser = () => parser

export const MATCHERS = {
  isSamsung: () =>
    UA.match(
      /SAMSUNG|Samsung|SGH-[INT]|GT-[I|N]|SM-[ANPTZ]|SHV-E|SCH-[IJRS]|SPH-L/i,
    ),
}
