import 'dart:math';

double calculateListViewHeight(int itemCount) {
  const itemHeight = 90.0; // Adjust this value as needed
  const spacing = 2.0; // Adjust this value as needed
  return min(itemCount, 2) * itemHeight + (itemCount - 1) * spacing;
}
