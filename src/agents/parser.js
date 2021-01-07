import Bowser from 'bowser'

const parser = Bowser.getParser(window.navigator.userAgent)

export const getParser = () => parser
export const isSamsung = () => navigator.userAgent.match(/SAMSUNG|Samsung|SGH-[INT]|GT-[I|N]|SM-[ANPTZ]|SHV-E|SCH-[IJRS]|SPH-L/i)



