"""Borrowed from https://github.com/Farama-Foundation/miniwob-plusplus/blob/553daee55ea0b2cc32b181a474083ab4cad782a1/miniwob/spaces.py"""

from typing import Any

import numpy as np
from gymnasium.spaces import Space
from numpy.typing import NDArray


class Unicode(Space):
    """
    A space representing a unicode string.
    """

    def __init__(self):
        super().__init__()

    def contains(self, x: Any) -> bool:
        """Return boolean specifying if x is a valid member of this space."""
        # Do not check the character set.
        return isinstance(x, str)

    def __repr__(self) -> str:
        """Gives a string representation of this space."""
        return f"Unicode()"

    def __eq__(self, other: Any) -> bool:
        """Check whether ``other`` is equivalent to this instance."""
        return isinstance(other, Unicode)


class Float(Space):
    """
    A space representing a float.
    """

    def __init__(self):
        super().__init__()

    def contains(self, x: Any) -> bool:
        """Return boolean specifying if x is a valid member of this space."""
        return isinstance(x, float)

    def __repr__(self) -> str:
        """Gives a string representation of this space."""
        return f"Float()"

    def __eq__(self, other: Any) -> bool:
        """Check whether ``other`` is equivalent to this instance."""
        return isinstance(other, Float)


class Integer(Space):
    """
    A space representing an integer.
    """

    def __init__(self):
        super().__init__()

    def contains(self, x: Any) -> bool:
        """Return boolean specifying if x is a valid member of this space."""
        return isinstance(x, int)

    def __repr__(self) -> str:
        """Gives a string representation of this space."""
        return f"Integer()"

    def __eq__(self, other: Any) -> bool:
        """Check whether ``other`` is equivalent to this instance."""
        return isinstance(other, Integer)


class AnyDict(Space):
    """A space representing an arbitrary dictionary object."""

    def contains(self, x: Any) -> bool:
        """Return boolean specifying if x is a valid member of this space."""
        # Do not check anything specific.
        return isinstance(x, dict)

    def __repr__(self) -> str:
        """Gives a string representation of this space."""
        return f"AnyDict()"

    def __eq__(self, other: Any) -> bool:
        """Check whether ``other`` is equivalent to this instance."""
        return isinstance(other, AnyDict)


class Anything(Space):
    """A space representing an arbitrary dictionary object."""

    def contains(self, x: Any) -> bool:
        return True

    def __repr__(self) -> str:
        return f"Anything()"

    def __eq__(self, other: Any) -> bool:
        return isinstance(other, Anything)


class AnyBox(Space[NDArray[Any]]):
    """A space representing an arbitrary dictionary object."""

    def __init__(self, low, high, shape, dtype):
        super().__init__(shape, dtype)
        self.low = low
        self.high = high

    def contains(self, x: Any) -> bool:
        """Return boolean specifying if x is a valid member of this space."""
        if not isinstance(x, np.ndarray):
            try:
                x = np.asarray(x, dtype=self.dtype)
            except (ValueError, TypeError):
                return False

        return bool(
            np.can_cast(x.dtype, self.dtype)
            and len(x.shape) == len(self.shape)
            and all([dim in (xdim, -1) for xdim, dim in zip(x.shape, self.shape)])
            and np.all(x >= self.low)
            and np.all(x <= self.high)
        )

    def __repr__(self) -> str:
        """Gives a string representation of this space."""
        return f"AnyBox(low={repr(self.low)}, high={repr(self.high)}, shape={repr(self.shape)}, dtype={repr(self.dtype)})"

    def __eq__(self, other: Any) -> bool:
        """Check whether ``other`` is equivalent to this instance."""
        return (
            isinstance(other, AnyBox)
            and self.low == other.low
            and self.high == other.high
            and self.shape == other.shape
            and self.dtype == other.dtype
        )
