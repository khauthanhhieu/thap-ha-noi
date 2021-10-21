export default async function execHanoiTower(nDisk, moveDiskTo, a = 'A', b = 'B', c = 'C') {
  if (nDisk < 2) {
    await moveDiskTo(a, c)
    return
  }

  await execHanoiTower(nDisk - 1, moveDiskTo, a, c, b)
  await execHanoiTower(1, moveDiskTo, a, b, c)
  await execHanoiTower(nDisk - 1, moveDiskTo, b, a, c)
}
