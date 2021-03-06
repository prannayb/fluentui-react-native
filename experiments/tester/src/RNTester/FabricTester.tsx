import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { StealthButton, Text, Separator } from 'react-native-uifabric';
import { registerThemes } from './CustomThemes';
import { allTestComponents } from './TestComponents';
import { fabricTesterStyles } from './styles';
import { useTheme } from '@uifabricshared/theming-react-native';

// uncomment the below lines to enable message spy
/*
const msgq = require('MessageQueue');
msgq.spy(true);
*/

registerThemes();

const EmptyComponent: React.FunctionComponent = () => {
  return <Text style={fabricTesterStyles.noTest}>Select a component from the left.</Text>;
};

// sort tests alphabetically by name
const sortedTestComponents = allTestComponents.sort((a, b) => a.name.localeCompare(b.name));

export interface IFabricTesterProps {
  initialTest?: string;
}

export const FabricTester: React.FunctionComponent<IFabricTesterProps> = (props: IFabricTesterProps) => {
  const { initialTest } = props;
  const initialSelectedTestIndex = sortedTestComponents.findIndex(description => {
    return description.name === initialTest;
  });

  const [selectedTestIndex, setSelectedTestIndex] = React.useState(initialSelectedTestIndex);

  const TestComponent = selectedTestIndex == -1 ? EmptyComponent : sortedTestComponents[selectedTestIndex].component;

  const TestListSeparator = Separator.customize({
    tokens: {
      color: useTheme().colors.inputBorder,
      separatorWidth: 2
    }
  });

  return (
    <View style={fabricTesterStyles.root}>
      <ScrollView style={fabricTesterStyles.testList} contentContainerStyle={fabricTesterStyles.testListContainerStyle}>
        <Text style={fabricTesterStyles.testHeader}>⚛ FluentUI Tests</Text>

        {sortedTestComponents.map((description, index) => {
          return (
            <StealthButton
              key={index}
              disabled={index == selectedTestIndex}
              content={description.name}
              onClick={() => setSelectedTestIndex(index)}
              style={fabricTesterStyles.testListItem}
            />
          );
        })}
      </ScrollView>

      <TestListSeparator vertical style={fabricTesterStyles.separator} />

      <ScrollView>
        <TestComponent />
      </ScrollView>
    </View>
  );
};
