export function numberFomatter(number:number){
    const formatter = new Intl.NumberFormat('en-US', {
        notation:'compact',
        compactDisplay:'short'
    })
    return formatter.format(number)

}

export function calculateAverage(ratings: { name: string; count: number }[]) {
  let totalScore = 0;
  let totalCount = 0;

  ratings.forEach(item => {
    const ratingValue = parseInt(item.name); // "1 star" → 1
    totalScore += ratingValue * item.count;
    totalCount += item.count;
  });

  return totalCount === 0 ? 0 : totalScore / totalCount;
}

