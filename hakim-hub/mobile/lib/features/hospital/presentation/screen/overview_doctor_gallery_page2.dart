import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/core/utils/ui_converter.dart';

class MyTabBarView extends StatefulWidget {
  const MyTabBarView({Key? key}) : super(key: key);

  @override
  _MyTabBarViewState createState() => _MyTabBarViewState();
}

class _MyTabBarViewState extends State<MyTabBarView>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize:
            Size.fromHeight(UIConverter.getComponentHeight(context, 120)),
        child: AppBar(
          backgroundColor: Colors.white,
          title: Text(
            'My Tab Bar View',
            style: TextStyle(
              fontSize: UIConverter.getComponentWidth(context, 20),
              fontWeight: FontWeight.bold,
              color: Colors.blue,
            ),
          ),
          bottom: TabBar(
            controller: _tabController,
            indicatorColor: Colors.blue,
            tabs: [
              Tab(
                child: Text(
                  'Overview',
                  style: TextStyle(
                    fontSize: UIConverter.getComponentWidth(context, 12),
                    fontWeight: FontWeight.bold,
                    color: Colors.blue,
                  ),
                ),
              ),
              Tab(
                child: Text(
                  'Doctor',
                  style: TextStyle(
                    fontSize: UIConverter.getComponentWidth(context, 12),
                    fontWeight: FontWeight.bold,
                    color: _tabController.index == 1
                        ? Colors.blue
                        : const Color.fromARGB(255, 0, 0, 0),
                  ),
                ),
              ),
              Tab(
                child: Text(
                  'Gallery',
                  style: TextStyle(
                    fontSize: UIConverter.getComponentWidth(context, 12),
                    fontWeight: FontWeight.bold,
                    color: _tabController.index == 2
                        ? Colors.blue
                        : const Color.fromARGB(255, 0, 0, 0),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          Center(
            child: Text(
              'Overview page content',
              style: TextStyle(
                fontSize: UIConverter.getComponentWidth(context, 24),
              ),
            ),
          ),
          Center(
            child: Text(
              'Doctor page content',
              style: TextStyle(
                fontSize: UIConverter.getComponentWidth(context, 24),
              ),
            ),
          ),
          Center(
            child: Text(
              'Gallery page content',
              style: TextStyle(
                fontSize: UIConverter.getComponentWidth(context, 24),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
