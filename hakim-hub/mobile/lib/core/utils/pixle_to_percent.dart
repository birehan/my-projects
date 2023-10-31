double pixleToPercent(pixle, dimention) {
  if (dimention == "width") {
    return (pixle * 100) / 428;
  }
  return (pixle * 100) / 926;
}
