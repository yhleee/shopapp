package kr.co.oliveyoung.shopapp.common.utils;

import java.util.*;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public final class Generics {
    private Generics() {
        throw new UnsupportedOperationException();
    }

    public static <K, V> Map<K, V> map() {
        return new HashMap<K, V>();
    }

    public static <T> List<T> list() {
        return new ArrayList<T>();
    }

    public static <T> Set<T> set() {
        return new HashSet<T>();
    }

    public static final class Tuple<X, Y> {
        private final X xv;
        private final Y yv;

        public Tuple(X xv, Y yv) {
            this.xv = xv;
            this.yv = yv;
        }

        public X getX() {
            return xv;
        }

        public Y getY() {
            return yv;
        }

        /**
         * {@inheritDoc}
         */
        @Override
        public String toString() {
            return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
        }
    }

    public static final class KeyValue<X, Y> {
        private final X key;
        private final Y value;

        public KeyValue(X key, Y value) {
            this.key = key;
            this.value = value;
        }

        public X getKey() {
            return key;
        }

        public Y getValue() {
            return value;
        }

        /**
         * {@inheritDoc}
         */
        @Override
        public String toString() {
            return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
        }
    }
}
