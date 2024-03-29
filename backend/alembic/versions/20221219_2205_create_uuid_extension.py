"""Create UUID extension

Created: 2023-04-12 22:05:25.489383+00:00
"""
from alembic import op

# Revision identifiers, used by Alembic.
revision = '774b416c247d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute('DROP EXTENSION "uuid-ossp";')
    # ### end Alembic commands ###
