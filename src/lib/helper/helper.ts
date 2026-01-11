export function setCronNumber(selectedNum: string): string {
    const targetNumberValueArry = ["15分","30分","1時間","3時間","6時間","12時間"]
    return targetNumberValueArry[parseInt(selectedNum)] 
}