"""Borrowed from https://github.com/Farama-Foundation/miniwob-plusplus/blob/553daee55ea0b2cc32b181a474083ab4cad782a1/miniwob/spaces.py"""

from typing import Any

import numpy as np
from gymnasium.spaces import Space, Box, Text
from gymnasium.spaces.utils import flatdim, flatten, flatten_space, unflatten
from numpy.typing import NDArray


MAX_UNICODE_CODEPOINT = 0x10FFFF


class Unicode(Text):
    """A space representing a unicode string.

    Unicode is a replacement for the Text space in Gymnasium, with the
    following differences:

    - Each character can be an arbitrary unicode character.
    - The sample method samples from the specified character set.
    """

    def contains(self, x: Any) -> bool:
        """Return boolean specifying if x is a valid member of this space."""
        # Do not check the character set.
        return isinstance(x, str) and self.min_length <= len(x) <= self.max_length

    def __repr__(self) -> str:
        """Gives a string representation of this space."""
        return f"Unicode({self.min_length}, {self.max_length})"

    def __eq__(self, other: Any) -> bool:
        """Check whether ``other`` is equivalent to this instance."""
        return (
            isinstance(other, Unicode)
            and self.min_length == other.min_length
            and self.max_length == other.max_length
        )


@flatdim.register(Unicode)
def _flatdim_unicode(space: Unicode) -> int:
    return space.max_length


@flatten.register(Unicode)
def _flatten_unicode(space: Unicode, x: str) -> NDArray[np.int32]:
    arr = np.full(shape=(space.max_length,), fill_value=0, dtype=np.int32)
    for i, val in enumerate(x):
        arr[i] = ord(val)
    return arr


@unflatten.register(Unicode)
def _unflatten_unicode(space: Unicode, x: NDArray[np.int32]) -> str:
    return "".join(chr(val) for val in x if val)


@flatten_space.register(Unicode)
def _flatten_space_unicode(space: Unicode) -> Box:
    return Box(low=0, high=MAX_UNICODE_CODEPOINT, shape=(space.max_length,), dtype=np.int32)


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
