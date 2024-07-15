import { View, Text } from "react-native"
import { styles } from "./styles"
import Animated, {SharedValue,interpolate,useAnimatedStyle, withTiming,} from "react-native-reanimated"

export enum CARD_SIDE {
  front = 0,
  back = 1,
}

type CreditProps = {
  cardSide: SharedValue<number>
  data: {
    name: string
    number: string
    date: string
    code: string
  }
}

export function Credit({ cardSide, data }: CreditProps) {
  const frontAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      cardSide.value,
      [CARD_SIDE.front, CARD_SIDE.back],
      [0, 180]
    )

    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    }
  })

  const backAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      cardSide.value,
      [CARD_SIDE.front, CARD_SIDE.back],
      [180, 360]
    )

    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    }
  })

  return (
    <View>
      <Animated.View style={[styles.card, styles.front, frontAnimatedStyles]}>
        <View style={styles.header}>
          <View style={[styles.circle, styles.logo]} />
          <Text>Meu Cartão</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.name}> Michelle Martins{data.name}</Text>

          <View style={styles.flag}>
            <View style={[styles.circle, styles.red]} />
            <View style={[styles.circle, styles.orange]} />
          </View>
        </View>
      </Animated.View>

      <Animated.View style={[styles.card, styles.back, backAnimatedStyles]}>
        <View>
          <Text style={styles.label}>Número do cartão</Text>
          <Text style={styles.value}>{data.number} 9876 5432 1098 7654</Text>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.label}>Validade</Text>
            <Text style={styles.value}>{data.date}12/30</Text>
          </View>

          <View>
            <Text style={styles.label}>CVV</Text>
            <Text style={styles.value}>{data.code}123</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  )
}