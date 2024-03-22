export const useColor = (name) => {
  const colors = {
    black: '#000',
    blue: '#606D80',
    brown: '#ad6542',
    beige: '#c6bdae',
    green: '#234f2c',
    lightpink: '#fff9f8',
    lightblue: '#e0e2e6',
    lightgray: '#F2F2F2',
    white: '#fff',
  }

  return colors.hasOwnProperty(name) ? colors[name] : null
}
